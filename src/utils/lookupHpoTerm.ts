import { TermResponse } from '../hpoJax';

interface IResult {
  term?: string;
  label?: string;
  error?: string;
}
export default async function lookupHpoTerm(term: string): Promise<IResult> {
  const ret = await fetch(
    `https://hpo.jax.org/api/hpo/term/${encodeURI(term)}`,
  );
  if (ret.ok) {
    const res = (await ret.json()) as TermResponse;
    return { term, label: res.details.name };
  } else {
    return { error: 'Unknown HPO term' };
  }
}
