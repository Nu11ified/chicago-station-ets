"use client";

import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";
import { mockAlerts } from "./_components/mockAlerts";
import AlertList from "./_components/AlertList";
import type { Alert } from "./_components/AlertCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useTheme } from "next-themes";

export default function Home() {
	const { theme } = useTheme();
	// Table setup
	const columns = [
		{
			header: "Headline",
			accessorKey: "Headline",
		},
		{
			header: "Impact",
			accessorKey: "Impact",
		},
		{
			header: "Severity",
			accessorKey: "SeverityScore",
		},
		{
			header: "Stations",
			accessorKey: "AffectedStations",
			cell: (info: { getValue: () => string[] }) => info.getValue().join(", "),
		},
		{
			header: "Routes",
			accessorKey: "AffectedRoutes",
			cell: (info: { getValue: () => string[] }) => info.getValue().join(", "),
		},
		{
			header: "Start",
			accessorKey: "EventStart",
		},
		{
			header: "Details",
			accessorKey: "AlertURL",
			cell: (info: { getValue: () => string }) => <a href={info.getValue()} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>,
		},
	] satisfies import("@tanstack/react-table").ColumnDef<Alert, any>[];
	const [sorting, setSorting] = useState<import("@tanstack/react-table").SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const table = useReactTable<Alert>({
		data: mockAlerts,
		columns,
		state: { sorting, globalFilter },
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
	});

	// Chart data for Recharts
	const severityData = mockAlerts.map(a => ({ name: a.Headline, severity: a.SeverityScore }));
	const impactCounts = mockAlerts.reduce<Record<string, number>>((acc, a) => {
		acc[a.Impact] = (acc[a.Impact] || 0) + 1;
		return acc;
	}, {});
	const impactData = Object.entries(impactCounts).map(([impact, count]) => ({ impact, count }));
	const alertsOverTimeMap = mockAlerts.reduce<Record<string, number>>((acc, a) => {
		const date = a.EventStart?.split(" ")[0];
		if (date) {
			acc[date] = (acc[date] || 0) + 1;
		}
		return acc;
	}, {});
	const timeData = Object.entries(alertsOverTimeMap).map(([date, count]) => ({ date, count }));
	const chartConfig = {
		severity: { label: "Severity Score", color: "hsl(var(--chart-1))" },
		count: { label: "Count", color: "hsl(var(--chart-2))" },
	} satisfies ChartConfig;

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] flex flex-col font-sans">
			{/* Navigation Bar */}
			<nav className="w-full py-6 px-4 md:px-0 flex flex-col items-center justify-center gap-3 bg-transparent">
				<div className="flex flex-col items-center gap-2">
					<span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00f2fe] bg-clip-text text-transparent tracking-tight drop-shadow-lg text-center animate-fade-in-up" style={{ fontFamily: 'Geist, Inter, sans-serif' }}>CTA Outage Dashboard</span>
					<span className="text-lg md:text-xl text-gray-200/80 font-medium text-center animate-fade-in-up">Chicago Transit Authority Outage & Alert Tracker</span>
				</div>
				<div className="mt-2 animate-fade-in-up">
					<ModeToggle />
				</div>
			</nav>
			<div className="flex flex-1">
				<main className="flex-1 px-2 md:px-0 py-10 space-y-16 animate-fade-in-up">
					<div className="max-w-4xl mx-auto w-full">
						{/* Hero Glass Card */}
						<section className="mb-12 flex justify-center animate-fade-in-up">
							<div className="backdrop-blur-xl bg-white/10 dark:bg-zinc-900/30 border border-white/20 dark:border-zinc-700/40 shadow-2xl rounded-2xl px-8 py-6 flex flex-col items-center gap-2 max-w-2xl w-full">
								<span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00f2fe] bg-clip-text text-transparent text-center animate-fade-in-up">Stay Informed. Stay Moving.</span>
								<span className="text-base md:text-lg text-gray-100/80 text-center animate-fade-in-up">Get real-time and historical alerts for all CTA train stations, visualized with beautiful, interactive graphs and tables.</span>
							</div>
						</section>
						{/* Quick Stats Boxes */}
						<section className="mb-12 flex flex-col md:flex-row gap-6 justify-center animate-fade-in-up">
							<Card className="flex-1 min-w-[200px] p-8 bg-white/20 dark:bg-zinc-800/40 shadow-2xl border border-white/20 dark:border-zinc-700/40 rounded-2xl backdrop-blur-xl text-center transition-transform hover:scale-105 hover:shadow-3xl animate-fade-in-up">
								<div className="text-base text-gray-200/80">Total Alerts</div>
								<div className="text-4xl font-extrabold bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent">{mockAlerts.length}</div>
							</Card>
							<Card className="flex-1 min-w-[200px] p-8 bg-white/20 dark:bg-zinc-800/40 shadow-2xl border border-white/20 dark:border-zinc-700/40 rounded-2xl backdrop-blur-xl text-center transition-transform hover:scale-105 hover:shadow-3xl animate-fade-in-up">
								<div className="text-base text-gray-200/80">Unique Stations</div>
								<div className="text-4xl font-extrabold bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent">{[...new Set(mockAlerts.flatMap(a => a.AffectedStations))].length}</div>
							</Card>
							<Card className="flex-1 min-w-[200px] p-8 bg-white/20 dark:bg-zinc-800/40 shadow-2xl border border-white/20 dark:border-zinc-700/40 rounded-2xl backdrop-blur-xl text-center transition-transform hover:scale-105 hover:shadow-3xl animate-fade-in-up">
								<div className="text-base text-gray-200/80">Major Alerts</div>
								<div className="text-4xl font-extrabold bg-gradient-to-r from-[#43e97b] to-[#38f9d7] bg-clip-text text-transparent">{mockAlerts.filter(a => a.MajorAlert === "1").length}</div>
							</Card>
						</section>
						{/* Hero Section */}
						<section className="mb-10 text-center animate-fade-in-up">
							<h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-700 via-sky-500 to-emerald-400 bg-clip-text text-transparent mb-4 drop-shadow animate-fade-in-up">CTA Train Station Outage Tracker</h1>
							<p className="text-xl text-blue-700 dark:text-emerald-300 mb-6 animate-fade-in-up">Live and historical alerts for Chicago's train stations, visualized with modern UI.</p>
							<Separator className="my-6 bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-300 h-1 rounded-full opacity-60" />
						</section>
						{/* Graphs */}
						<section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 animate-fade-in-up">
							{/* Severity by Alert Bar Chart */}
							<Card className="p-6 bg-white/80 dark:bg-zinc-800/80 shadow-xl border-0 animate-fade-in-up">
								<h2 className="text-lg font-bold mb-4 text-indigo-700 dark:text-emerald-300">Severity by Alert</h2>
								<ChartContainer config={chartConfig} className="min-h-[300px] w-full">
									<ResponsiveContainer width="100%" height={300}>
										<BarChart data={severityData} barSize={40} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
											<CartesianGrid vertical={false} strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
											<XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} interval={0} angle={-20} textAnchor="end" height={60} stroke={theme === 'dark' ? '#fff' : '#222'} tick={{ fill: theme === 'dark' ? '#fff' : '#222', fontSize: 13 }} />
											<YAxis allowDecimals={false} stroke={theme === 'dark' ? '#fff' : '#222'} tick={{ fill: theme === 'dark' ? '#fff' : '#222', fontSize: 13 }} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<ChartLegend content={<ChartLegendContent />} />
											<Bar dataKey="severity" fill="hsl(var(--chart-1))" radius={4} />
										</BarChart>
									</ResponsiveContainer>
								</ChartContainer>
							</Card>
							{/* Alerts by Impact Pie Chart */}
							<Card className="p-6 bg-white/80 dark:bg-zinc-800/80 shadow-xl border-0 animate-fade-in-up">
								<h2 className="text-lg font-bold mb-4 text-indigo-700 dark:text-emerald-300">Alerts by Impact</h2>
								<ChartContainer config={chartConfig} className="min-h-[300px] w-full flex items-center justify-center">
									<ResponsiveContainer width="100%" height={300}>
										<PieChart>
											<Pie data={impactData} dataKey="count" nameKey="impact" cx="50%" cy="50%" outerRadius={90} label fill={theme === 'dark' ? '#fff' : '#222'}>
												{impactData.map((entry, idx) => (
													<Cell key={`cell-${idx}`} fill={`hsl(var(--chart-${(idx % 5) + 1}))`} />
												))}
											</Pie>
											<ChartTooltip content={<ChartTooltipContent nameKey="impact" />} />
											<ChartLegend content={<ChartLegendContent nameKey="impact" />} />
										</PieChart>
									</ResponsiveContainer>
								</ChartContainer>
							</Card>
							{/* Alerts Over Time Line Chart */}
							<Card className="p-6 bg-white/80 dark:bg-zinc-800/80 shadow-xl border-0 animate-fade-in-up">
								<h2 className="text-lg font-bold mb-4 text-indigo-700 dark:text-emerald-300">Alerts Over Time</h2>
								<ChartContainer config={chartConfig} className="min-h-[300px] w-full">
									<ResponsiveContainer width="100%" height={300}>
										<LineChart data={timeData} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
											<CartesianGrid vertical={false} strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
											<XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} stroke={theme === 'dark' ? '#fff' : '#222'} tick={{ fill: theme === 'dark' ? '#fff' : '#222', fontSize: 13 }} />
											<YAxis allowDecimals={false} stroke={theme === 'dark' ? '#fff' : '#222'} tick={{ fill: theme === 'dark' ? '#fff' : '#222', fontSize: 13 }} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<ChartLegend content={<ChartLegendContent />} />
											<Line type="monotone" dataKey="count" stroke="hsl(var(--chart-2))" strokeWidth={3} dot={{ r: 5, fill: theme === 'dark' ? '#fff' : '#222' }} />
										</LineChart>
									</ResponsiveContainer>
								</ChartContainer>
							</Card>
						</section>
						<Separator className="my-10 bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00f2fe] h-1 rounded-full opacity-60 animate-fade-in-up" />
						{/* TanStack Table */}
						<section className="mb-10 animate-fade-in-up">
							<h2 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-emerald-300">All Alerts (Interactive Table)</h2>
							<div className="mb-4 flex items-center gap-3">
								<input
									className="border rounded px-3 py-2 text-base bg-white/80 dark:bg-zinc-800/80 shadow focus:ring-2 focus:ring-indigo-400 dark:focus:ring-emerald-400 transition"
									placeholder="Search..."
									value={globalFilter}
									onChange={e => setGlobalFilter(e.target.value)}
								/>
								<span className="text-sm text-gray-500 dark:text-gray-300">(Filter by any field)</span>
							</div>
							<div className="overflow-x-auto rounded-xl shadow-2xl bg-white/80 dark:bg-zinc-800/80">
								<table className="min-w-full divide-y divide-blue-100 dark:divide-zinc-700">
									<thead className="bg-blue-50 dark:bg-zinc-900/60">
										{table.getHeaderGroups().map(headerGroup => (
											<tr key={headerGroup.id}>
												{headerGroup.headers.map(header => (
													<th
														key={header.id}
														className="px-6 py-3 text-left text-base font-semibold text-indigo-700 dark:text-emerald-300 cursor-pointer select-none hover:underline transition"
														onClick={header.column.getToggleSortingHandler()}
													>
														{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
														{header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? " ▲" : " ▼") : ""}
													</th>
												))}
											</tr>
										))}
									</thead>
									<tbody>
										{table.getRowModel().rows.map(row => (
											<tr key={row.id} className="hover:bg-indigo-50 dark:hover:bg-emerald-900/30 transition">
												{row.getVisibleCells().map(cell => (
													<td key={cell.id} className="px-6 py-3 text-base text-gray-700 dark:text-gray-200">
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
								<div className="flex justify-between items-center p-4 text-sm">
									<div>
										Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
									</div>
									<div className="space-x-2">
										<Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} variant="outline">First</Button>
										<Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} variant="outline">Prev</Button>
										<Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} variant="outline">Next</Button>
										<Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} variant="outline">Last</Button>
									</div>
								</div>
							</div>
						</section>
						<Separator className="my-10 bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00f2fe] h-1 rounded-full opacity-60 animate-fade-in-up" />
						{/* Alert Cards (original section) */}
						<section className="animate-fade-in-up">
							<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00f2fe] bg-clip-text text-transparent text-center">Alert Cards</h2>
							<AlertList alerts={mockAlerts} highlightFirst />
						</section>
						{/* Dialog Example */}
						<section className="mt-12 animate-fade-in-up">
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button className="px-6 py-3 bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00f2fe] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition">Show Info Dialog</Button>
								</AlertDialogTrigger>
								<AlertDialogContent className="backdrop-blur-lg bg-white/80 dark:bg-zinc-900/80 border-0 shadow-2xl">
									<AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00f2fe] bg-clip-text text-transparent">About This Dashboard</AlertDialogTitle>
									<AlertDialogDescription className="text-lg text-gray-700 dark:text-gray-200">
										This dashboard is a demo of shadcn/ui, TanStack Table, and react-chartjs-2 integration. All data is mock data. Enjoy the interactivity and animations!
									</AlertDialogDescription>
									<AlertDialogAction asChild>
										<Button variant="outline">Close</Button>
									</AlertDialogAction>
								</AlertDialogContent>
							</AlertDialog>
						</section>
					</div>
				</main>
			</div>
		</div>
	);
}
