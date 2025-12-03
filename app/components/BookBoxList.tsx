import { BookBox } from "../data/mockBookBoxes";
import styles from "./BookBoxList.module.css";

interface BookBoxListProps {
    bookBoxes: BookBox[];
    onSelectBox: (box: BookBox) => void;
}

export default function BookBoxList({ bookBoxes, onSelectBox }: BookBoxListProps) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Résultats</h2>
            {bookBoxes.map((box) => (
                <div
                    key={box.id}
                    className={styles.card}
                    onClick={() => onSelectBox(box)}
                >
                    <div className={styles.cardHeader}>
                        <div>
                            <h3 className={styles.boxName}>{box.name}</h3>
                            <p className={styles.boxAddress}>{box.address}</p>
                            <p className={styles.boxCity}>{box.city}</p>
                        </div>
                        <div className={styles.iconContainer}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                        </div>
                    </div>
                    {box.description && (
                        <p className={styles.description}>{box.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
