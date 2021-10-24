import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Movie } from "src/app/features/catalog/model/movie.model";

@Injectable({providedIn: 'root'})
export class DialogService {
    private $dialog = new BehaviorSubject<Movie | null>(null);
    tempMovie = {
        adult: false,
        backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
        genre_ids: [18, 80],
        id: 278,
        original_language: "en",
        original_title: "The Shawshank Redemption",
        overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
        popularity: 65.752,
        poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        release_date: "1994-09-23",
        title: "The Shawshank Redemption",
        video: false,
        vote_average: 8.7,
        vote_count: 19931
    }
    updateDialog(movie: Movie) {
        console.log(movie);
        // this.$dialog.next(movie);
    }
}