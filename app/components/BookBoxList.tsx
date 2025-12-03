import { BookBox } from "../data/mockBookBoxes";

interface BookBoxListProps {
    bookBoxes: BookBox[];
    onSelectBox: (box: BookBox) => void;
}

export default function BookBoxList({ bookBoxes, onSelectBox }: BookBoxListProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {bookBoxes.map((box) => (
                <div
                    key={box.id}
                    className="border rounded-xl p-4 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm"
                    onClick={() => onSelectBox(box)}
                >
                    <h3 className="font-semibold text-lg">{box.name}</h3>
                    <p className="text-gray-600 text-sm">{box.address}</p>
                    <p className="text-gray-500 text-xs mt-1">{box.city}</p>
                    {box.description && (
                        <p className="text-gray-700 text-sm mt-2">{box.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
