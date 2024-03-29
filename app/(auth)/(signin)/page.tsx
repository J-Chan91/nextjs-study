import Page from "./_components/Page";

export type postSigninParams = {
  id: string;
  password: string;
};

export default async function Signin() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-black">
      <Page />
    </main>
  );
}
