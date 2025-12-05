import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import About from '../components/About';

export default function Home() {
    return (
        <main>
            <Hero />
            <div id="work">
                <BentoGrid />
            </div>
            <div id="about">
                <About />
            </div>
            <div id="contact"></div>
        </main>
    );
}
