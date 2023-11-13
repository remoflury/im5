import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({url, locals: {getSession, supabase}}) => {
  const session = await getSession()
  if (!session) return new Response(JSON.stringify({error: 'Unauthorized, please login.'}), { status: 401 });

  // get searchquery
  const searchQuery = url.searchParams.get('search')
  if (!searchQuery) return new Response(JSON.stringify({error: 'Please provide a search query'}), { status: 500 });

  // get company & company_id from db
  const { data, error: err } = await supabase
    .from('companies')
    .select('company, company_id')
    .ilike('company', `%${searchQuery}%`)

  if (err) return new Response(JSON.stringify({error: 'Unexpected error while fetching the companies'}), { status: 500 });

 
  return new Response(JSON.stringify(data));
};