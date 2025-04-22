import AlertList from "./_components/AlertList";
import { mockAlerts } from "./_components/mockAlerts";
import TrainAnimation from "./_components/TrainAnimation";

export default function Home() {
	return (
		<main className="relative min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 overflow-x-hidden">
			<TrainAnimation />
			<div className="max-w-2xl mx-auto px-4">
				<h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8 drop-shadow">
					CTA Train Station Outage Tracker
				</h1>
				<div className="backdrop-blur-md bg-white/60 rounded-2xl shadow-xl p-6 md:p-10 border border-blue-100">
					<AlertList alerts={mockAlerts} />
				</div>
			</div>
		</main>
	);
}
