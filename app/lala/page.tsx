export async function getLogin() {
  const res = await fetch(`${process.env.URL}/api/auth/signin`);

  console.log(res);

  return res.json();
}
export default async function Lala() {
  const data = await getLogin();

  console.log(data);

  return (
    <div>
      <div>Hi</div>
    </div>
  );
}
