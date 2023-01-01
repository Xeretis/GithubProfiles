import { A } from "@solidjs/router";

const FourOFour = () => {
    return (
        <div class="flex justify-center items-center h-screen">
            <div class="m-10">
                <h1 class="text-[146px] md:text-[186px] lg:text-[264px] text-center leading-[0.90] font-bold text-blue-200">404</h1>
                <p class="text-4xl leading-relaxed text-center font-bold text-gray-700">Page not found</p>
                <p class="text-lg md:text-xl text-center text-gray-600">Seems like the page you're looking for doesn't exist. Check the url, maybe it's just a typo.</p>
                <div class="flex justify-center m-2"><A href="/" class="text-lg text-blue-600 hover:underline">Go back home</A></div>
            </div>
        </div>
    );
};

export default FourOFour;
