import { dev } from "$app/environment";
import type { Link } from "$lib/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    const url = dev ? "http://localhost:3000" : "https://backend.beno.lol";

    const getIcon = async (name: string): Promise<string> => {
        const icon = (await fetch(`/assets/icons/svg/${name}.svg`)).text();
        return icon;
    }
    
    const icons = await Promise.all([
        getIcon('github'),
        getIcon('osu'),
        getIcon('discord'),
        getIcon('lastdotfm'),
        getIcon('spotify')
    ]);

    return {
        links: [
            {
                id: 1,
                icon: icons[0],
                href: "https://github.com/bojurgess",
                color: "#171a21",
                tooltip: "bojurgess"
            },
            {
                id: 2,
                icon: icons[1],
                href: "https://osu.ppy.sh/users/10192264",
                color: "#ff66aa",
                tooltip: "beno"
            },
            {
                id: 3,
                icon: icons[2],
                clipboard: "beno___",
                color: "#7289da",
                tooltip: "beno___"
            },
            {
                id: 4,
                icon: icons[3],
                href: "https://www.last.fm/user/beno__",
                color: "#d51007",
                tooltip: "beno__"
            },
            {
                id: 5,
                icon: icons[4],
                href: "https://open.spotify.com/user/8fzywdklm84r9hupsurfxdoj2",
                color: "#1db954",
                tooltip: "—beno"
            }
        ] satisfies Link[],
        spotifyIcon: icons[4],
    }
}