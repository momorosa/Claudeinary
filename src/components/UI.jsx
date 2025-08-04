import Button from "./Button"

export default function UI() {
    return (
        <main className="absolute left-0 top-0 w-screen z-10 pointer-events-auto">
            <div className="w-3/4 lg:w-auto absolute right-6 bottom-6">
                <img src="src/assets/cheesedrawing.png" />
            </div>

            <Section className="flex flex-col font-primary z-10">
                <h1 className="text-4xl md:text-9xl text-black drop-shadow-sm py-4">
                    Chef <br />
                    Claude_
                </h1>
                <p className="w-1/2 mt-2 lg:mt-10 md:text-3xl text-1xl font-medium">
                    Turns whatever’s in your fridge into a chef-worthy dish instantly.
                </p>
                <Button
                    href="/claudeinary"
                    className="w-64 font-medium font-primary text-black border border-black mt-8 lg:mt-12 px-8 py-2 rounded-full py-3 hover:bg-black hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out"
                    aria-label="start cooking"
                    rightIcon="restaurant"
                    iconSize="md-18"
                >
                    Get your recipes!
                </Button>
            </Section>
            <div className="flex gap-2 items-center absolute left-8 bottom-6 px-10 py-4 hover:text-white transition delay-150 duration-300 ease-in-out">
                <span class="relative flex size-3">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
                    <span class="relative inline-flex size-3 rounded-full bg-black"></span>
                </span>
                <a 
                    href = "https://quietbold.com"
                    target = "_blank"
                    rel = "noreferrer noopener"
                >
                    Rosa Choi | Made with curiosity
                </a>
            </div>
        </main>
    )
}

const Section = ({ children, className = "" }) => {
    return (
        <section className={`max-w-[1024px] mx-auto h-screen p-10 ${className}`}>
            {children}
        </section>
    )
}
