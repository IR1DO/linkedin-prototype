export default async function Page({ params }: { params: { id: string } }) {
  // DEBUG
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const { id } = params;

  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
