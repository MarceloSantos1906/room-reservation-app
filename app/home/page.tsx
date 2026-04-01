import FeaturesSection from "./Features/Features";
import IntroSection from "./Intro Section/IntroSection";

export default function Home() {
    return (
        <div className="overflow-hidden">
            <IntroSection/>
            <FeaturesSection/>
        </div>
    )
}