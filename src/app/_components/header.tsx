import { ThemeToggle } from "~/app/_components/theme-toggle";
import { getServerAuthSession } from "~/server/auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/app/_components/ui/avatar";
import { LoginButton } from "./login-button";


export default async function Header() {
  const session = await getServerAuthSession();

  function getNameInitials() {
    if (!session?.user?.name) return 'JD'
    const allNames = session.user.name.trim().split(/(-|_|\s|\.)/g);
    if (allNames.length === 1) return allNames[0]?.charAt(0).concat(allNames[0].charAt(1)).toUpperCase()
    const initials = allNames.reduce((acc, curr, index) => {
      if (index === 0 || index === allNames.length - 1) {
        acc = `${acc}${curr.charAt(0).toUpperCase()}`;
      }
      return acc;
    }, '');
    return initials;
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-4 p-2">
      {session?.user && (
        <div className="flex items-center gap-4">
          <p className="text-center text-2xl">
            {session && <span>{session.user?.name}</span>}
          </p>
          <Avatar>
            <AvatarImage src={session?.user.image ?? ''} />
            <AvatarFallback>
              {getNameInitials()}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LoginButton session={session} />
      </div>
    </div>
  )
}
