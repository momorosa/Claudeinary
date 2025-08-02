import Button from "./Button"

export default function UI() {
    return (
        <main className="absolute left-0 top-0 w-screen z-10 pointer-events-auto">
            <div className="absolute right-6 bottom-6">
                <img src="src/assets/cheesedrawing.png" />
            </div>

            <Section className="flex flex-col">
                <h1 className="text-4xl md:text-9xl text-black drop-shadow-sm py-4">
                    Chef <br />
                    Claude_
                </h1>
                <p className="mt-10 text-1xl font-light uppercase">
                    Chef Claude turns whatever’s in your fridge into a chef-worthy dish instantly.
                </p>
                <Button
                    href="#"
                    className="w-64 font-medium text-black border border-black mt-10 px-8 py-2 rounded-full py-3 mt-4 hover:bg-black hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out"
                    aria-label="start cooking"
                    rightIcon="restaurant"
                    iconSize="md-18"
                >
                    Get your recipes!
                </Button>
            </Section>
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
