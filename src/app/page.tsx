import { Session } from "next-auth";
import { unstable_noStore as noStore } from "next/cache";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {session ?
          (<CrudShowcase />)
          :
          (<h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Note <span className="text-[hsl(280,100%,70%)]">Taking</span> App
          </h1>)
        }
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const posts = await api.post.getAll.query();

  return (
    <div className="w-full max-w-xs">
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
