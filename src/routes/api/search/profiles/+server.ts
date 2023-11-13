import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({url, locals: {getSession, supabase}}) => {
  const session = await getSession()
  if (!session) return new Response(JSON.stringify({error: 'Unauthorized, please login.'}), { status: 401 });

  const searchQuery = url.searchParams.get('search')
  if (!searchQuery) return new Response(JSON.stringify({error: 'Please provide a search query'}), { status: 500 });

  const { data, error: err } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .ilike('last_name', `%${searchQuery}%`)

  if (err) return new Response(JSON.stringify({error: 'Unexpected error while fetching the profiles'}), { status: 500 });
 
  return new Response(JSON.stringify(data));
};