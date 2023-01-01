import { A, useParams } from "@solidjs/router";
import { ErrorBoundary, createResource } from "solid-js";

import { User } from "../types/user";

const Profile = () => {
    const params = useParams<{ name: string }>();

    const fetchUser = async (name: string): Promise<User> => {
        const res = await fetch(`https://api.github.com/users/${name}`);
        if (!res.ok) {
            throw new Error(res.status.toString());
        }
        return res.json();
    };

    const [user] = createResource(params.name, fetchUser);

    return (
        <div class="flex items-center justify-center h-screen">
            <ErrorBoundary
                fallback={(err) => (
                    <div class="m-10">
                        <h1 class="text-2xl text-red-600 text-center">
                            Failed to load user ({err.message})
                        </h1>
                        <p class="text-center text-gray-600">
                            If you got an error 404, it means the user you're looking for doesn't
                            exist. For any other error, please refer to{" "}
                            <a
                                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
                                class="text-blue-600 hover:underline"
                            >
                                this
                            </a>
                            .
                        </p>
                        <div class="flex justify-center m-2">
                            <A href="/" class="text-blue-600 hover:underline">
                                Go back home
                            </A>
                        </div>
                    </div>
                )}
            >
                {user.loading && (
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            class="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                )}
                {user() && (
                    <div class="h-2/4 w-full md:w-4/6 lg:w-1/3 bg-gray-100 rounded-md p-5 m-10 shadow-md flex flex-col justify-between">
                        <div>
                            <img
                                src={user()?.avatar_url}
                                alt={user()?.login}
                                class="rounded-full w-32 h-32 mx-auto"
                            />
                            <h1 class="text-2xl text-center font-bold">{user()?.login}</h1>
                            <div class="flex justify-between mt-2">
                                <p class="text-gray-600">
                                    Followers: <span class="font-bold text-black">{user()?.followers}</span>
                                </p>
                                <p class="text-gray-600">
                                    Following: <span class="font-bold text-black">{user()?.following}</span>
                                </p>
                            </div>
                            <div class="flex justify-between mt-2">
                                <p class="text-gray-600">
                                    Public repos: <span class="font-bold text-black">{user()?.public_repos}</span>
                                </p>
                                <p class="text-gray-600">
                                    Public gists: <span class="font-bold text-black">{user()?.public_gists}</span>
                                </p>
                            </div>
                        </div>
                        <div class="flex justify-between mt-2">
                            <a href={`https://github.com/${user()?.login}`} class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                    See on github
                                </span>
                            </a>
                            <A href="/" class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                    See someone else
                                </span>
                            </A>
                        </div>
                    </div>
                )}
            </ErrorBoundary>
        </div>
    );
};

export default Profile;
