import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Movie } from "src/app/features/catalog/model/movie.model";

@Injectable({providedIn: 'root'})
export class DialogService {
    private $dialog = new BehaviorSubject<any | null>(null);
    public dialog$ = this.$dialog.asObservable();
    updateDialog(movie: Movie) {
        this.$dialog.next(movie);
    }
    closeModal() {
        this.$dialog.next(null);
    }
}