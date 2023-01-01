import { Show, createSignal } from "solid-js";

import { useNavigate } from "@solidjs/router";

const Home = () => {
    const [name, setName] = createSignal("");
    const [nameMissing, setNameMissing] = createSignal(false);
    const navigate = useNavigate();

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        if (name().length === 0) {
            setNameMissing(true);
            return;
        }

        navigate(`/profile/${name()}`);

    };

    return (
        <div class="flex justify-center items-center h-screen">
            <div class="m-10 w-full">
                <h1 class="text-center font-bold text-4xl mb-2">Github Profile Viewer</h1>
                <p class="text-center text-gray-600 mb-2">
                    Enter a Github username to view their profile.
                </p>
                <form onSubmit={handleSubmit} class="flex justify-center items-start">
                    <div class="flex flex-col">
                        <input
                            value={name()}
                            onChange={(val) => setName(val.currentTarget.value)}
                            class={`w-64 md:w-96 bg-gray-50 border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2 ${nameMissing() ? "border-red-500 text-red-900" : "border-gray-300 text-gray-900"}`}
                        />
                        <Show when={nameMissing()}>
                            <p class="text-red-500 text-sm">Please enter a username</p>
                        </Show>
                    </div>
                    <button
                        class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
                    >
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            Show me
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;
