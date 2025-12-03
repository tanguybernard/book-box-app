import { BookBox } from "../data/mockBookBoxes";

interface BookBoxListProps {
    bookBoxes: BookBox[];
    onSelectBox: (box: BookBox) => void;
}

export default function BookBoxList({ bookBoxes, onSelectBox }: BookBoxListProps) {
    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">Résultats</h2>
            {bookBoxes.map((box) => (
                <div
                    key={box.id}
                    className="group border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-lg cursor-pointer transition-all duration-200 bg-white"
                    onClick={() => onSelectBox(box)}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-amber-700 transition-colors">{box.name}</h3>
                            <p className="text-stone-600 text-sm mt-1">{box.address}</p>
                            <p className="text-stone-500 text-xs mt-0.5 uppercase tracking-wide">{box.city}</p>
                        </div>
                        {/* Placeholder icon or image could go here */}
                        <div className="bg-stone-100 p-2 rounded-full text-stone-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                        </div>
                    </div>
                    {box.description && (
                        <p className="text-stone-600 text-sm mt-3 leading-relaxed border-t border-stone-100 pt-3">{box.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
