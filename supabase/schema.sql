-- Rode este arquivo uma vez no Supabase (SQL Editor)

create table if not exists public.link_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  event text not null check (event in ('view','click')),
  visitor_id text,
  source text,
  medium text,
  campaign text,
  referrer text,
  device text,
  country text
);

create index if not exists link_events_created_idx on public.link_events (created_at desc);

-- Sem políticas: só a service role (usada no servidor) consegue ler/gravar
alter table public.link_events enable row level security;

create or replace function public.get_link_stats(p_days int default 30)
returns json
language sql
security invoker
set search_path = public
as $$
  with ev as (
    select *, (created_at at time zone 'America/Sao_Paulo')::date as d
    from link_events
    where created_at >= now() - make_interval(days => p_days)
  ),
  today as (
    select * from ev
    where d = (now() at time zone 'America/Sao_Paulo')::date
  ),
  days as (
    select generate_series(
      (now() at time zone 'America/Sao_Paulo')::date - (p_days - 1),
      (now() at time zone 'America/Sao_Paulo')::date,
      interval '1 day')::date as d
  )
  select json_build_object(
    'totals', (select json_build_object(
        'views', count(*) filter (where event='view'),
        'clicks', count(*) filter (where event='click'),
        'visitors', count(distinct visitor_id) filter (where event='view'),
        'clickers', count(distinct visitor_id) filter (where event='click')
      ) from ev),
    'today', (select json_build_object(
        'views', count(*) filter (where event='view'),
        'clicks', count(*) filter (where event='click')
      ) from today),
    'daily', (select coalesce(json_agg(json_build_object(
        'day', days.d,
        'views', (select count(*) from ev where ev.d = days.d and event='view'),
        'clicks', (select count(*) from ev where ev.d = days.d and event='click')
      ) order by days.d), '[]'::json) from days),
    'sources', (select coalesce(json_agg(t), '[]'::json) from (
        select coalesce(nullif(source,''), nullif(referrer,''), 'direto') as name,
               count(*) filter (where event='view') as views,
               count(*) filter (where event='click') as clicks
        from ev group by 1 order by 2 desc limit 10) t),
    'campaigns', (select coalesce(json_agg(t), '[]'::json) from (
        select campaign as name,
               count(*) filter (where event='view') as views,
               count(*) filter (where event='click') as clicks
        from ev where campaign is not null group by 1 order by 2 desc limit 10) t),
    'devices', (select coalesce(json_agg(t), '[]'::json) from (
        select coalesce(device,'?') as name,
               count(*) filter (where event='view') as views,
               count(*) filter (where event='click') as clicks
        from ev group by 1 order by 2 desc) t)
  );
$$;

revoke execute on function public.get_link_stats(int) from public, anon, authenticated;
grant execute on function public.get_link_stats(int) to service_role;
