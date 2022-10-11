export const getAxieGenes = async (axieId: string): Promise<string> => {
  const fetcher = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operationName: "GetAxieDetail",
      variables: { axieId },
      query:
        "query GetAxieDetail($axieId: ID!) {\n  axie(axieId: $axieId) { newGenes\n}\n}",
    }),
  });
  const res = await fetcher.json();
  return res?.data?.axie?.newGenes;
};
