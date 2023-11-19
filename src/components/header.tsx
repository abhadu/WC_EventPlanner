export default function Header() {
    return (
        <header className="flex flex-row justify-center px-24 py-6 text-center">
            <span className=" font-semibold text-2xl">WC </span>
            <img src="/img/worldcup.png" width={32} height={24} />
            <span className=" font-semibold text-2xl">Event Planner</span>
        </header>
    )
}