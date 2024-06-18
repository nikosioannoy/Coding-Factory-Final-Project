export interface Movie {
    mediaID: number,
    movieName: string,
    releaseDate: string,
    description: string,
    runtime: string,
    coverImg: string,
    genre: string,
    review: string,
    director: string,
    cast: string[]
}

export interface MovieAddition {
    mediaID: number,
    movieName: string,
    releaseDate: string,
    description: string,
    runtime: string,
    coverImg: string,
    genre: string,
    review: string,
    director: string,
    cast: string
}

/** 
export const ManyMovies: Movie[] = [
    {
        "mediaID": 1,
        "movieName": "Inception",
        "releaseDate": "2010-07-16",
        "description": "A thief who enters the dreams of others to steal their secrets finds himself tasked with planting an idea into the mind of a CEO.",
        "runtime": "148 minutes",
        "coverImg": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
        "genre": "Action, Adventure, Sci-Fi",
        "review": "Inception is a masterpiece of modern cinema that delves deep into the realm of dreams and consciousness. Christopher Nolan's visionary direction coupled with a stellar ensemble cast led by Leonardo DiCaprio delivers a mind-bending experience that challenges perceptions of reality. The intricate plot weaves layers of dreams within dreams, creating a labyrinth of intrigue and suspense. With breathtaking visual effects and a hauntingly beautiful score, Inception captivates audiences from start to finish, leaving them pondering its philosophical themes long after the credits roll.",
        "director": "Christopher Nolan",
        "cast": ["Leonardo DiCaprio", " Joseph Gordon-Levitt", " Ellen Page", " Tom Hardy ", " Ken Watanabe ", " Marion Cotillard "]
    },
    {
        "mediaID": 2,
        "movieName": "Mulholland Drive",
        "releaseDate": "2001-10-12",
        "description": "After a car wreck on the winding Mulholland Drive renders a woman amnesiac, she and a perky Hollywood-hopeful search for clues and answers across Los Angeles in a twisting venture beyond dreams and reality.",
        "runtime": "147 minutes",
        "coverImg": "https://c8.alamy.com/comp/R59HG9/mulholland-drive-original-movie-poster-R59HG9.jpg",
        "genre": "Drama, Mystery, Thriller",
        "review": "A surreal exploration of Hollywood`s dark underbelly, where identities blur and reality is elusive.",
        "director": "David Lynch",
        "cast": ["Naomi Watts", " Laura Harring", " Justin Theroux", " Ann Miller", " Robert Forster"]
    },
    {
        "mediaID": 3,
        "movieName": "Shutter Island",
        "releaseDate": "2010-02-19",
        "description": "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
        "runtime": "138 minutes",
        "coverImg": "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        "genre": "Mystery, Thriller",
        "review": "A gripping psychological thriller that keeps you guessing until the very end.",
        "director": "Martin Scorsese",
        "cast": ["Leonardo DiCaprio", " Mark Ruffalo", " Ben Kingsley", " Michelle Williams", " Emily Mortimer"]
    },
    {
        "mediaID": 4,
        "movieName": "Resident Evil Apocalypse",
        "releaseDate": "2004-09-10",
        "description": "Alice wakes up in Racoon city hospital after the city has been overrun by zombies. Alice must now make it out of the city before a nuclear bomb is dropped on the city.",
        "runtime": "94 minutes",
        "coverImg": "https://m.media-amazon.com/images/M/MV5BMTc1NTUxMzk0Nl5BMl5BanBnXkFtZTcwNDQ1MDIzMw@@._V1_.jpg",
        "genre": "Action, Horror, Sci-Fi",
        "review": "A high-octane thrill ride through a post-apocalyptic world filled with zombies and relentless action.",
        "director": "Alexander Witt",
        "cast": ["Milla Jovovich", " Sienna Guillory", " Oded Fehr", " Thomas Kretschmann", " Jared Harris"]
    },
    {
        "mediaID": 5,
        "movieName": "Silent Hill",
        "releaseDate": "2006-04-21",
        "description": "A woman, Rose, goes in search for her adopted daughter within the confines of a strange, desolate town called Silent Hill.",
        "runtime": "125 minutes",
        "coverImg": "https://m.media-amazon.com/images/M/MV5BOWQzNTU3NGUtNDAxMi00ZjFjLTkyYWUtYjgwZDJiMDljZWY4XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
        "genre": "Adventure, Horror, Mystery",
        "review": "A chilling descent into a nightmarish town plagued by darkness and malevolent forces.",
        "director": "Christophe Gans",
        "cast": ["Radha Mitchell", " Sean Bean", " Laurie Holden", " Deborah Kara Unger", " Kim Coates"]
    },
    {
        "mediaID": 6,
        "movieName": "The Matrix",
        "releaseDate": "1999-03-31",
        "description": "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
        "runtime": "136 minutes",
        "coverImg": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        "genre": "Action, Sci-Fi",
        "review": "A groundbreaking sci-fi epic that bends the rules of reality and perception.",
        "director": "The Wachowskis",
        "cast": ["Keanu Reeves", " Laurence Fishburne", " Carrie-Anne Moss", " Hugo Weaving", " Joe Pantoliano"]
    },
    {
        "mediaID": 7,
        "movieName": "Taxi Driver",
        "releaseDate": "1976-02-08",
        "description": "A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action by attempting to liberate a presidential campaign worker and an underage prostitute.",
        "runtime": "113 minutes",
        "coverImg": "https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        "genre": "Crime, Drama",
        "review": "A gritty character study of urban alienation and moral decay.",
        "director": "Martin Scorsese",
        "cast": ["Robert De Niro", " Jodie Foster", " Cybill Shepherd", " Harvey Keitel", " Albert Brooks"]
        
    },
    {
        "mediaID": 8,
        "movieName": "Everything Everywhere all at Once",
        "releaseDate": "2022-03-25",
        "description": "A film that centers on a Chinese family who, when they discover their grandmother is dying, decide to celebrate her life, as she would have liked.",
        "runtime": "140 minutes",
        "coverImg": "https://images.squarespace-cdn.com/content/v1/5e7a8f6d95bc3643e73bc2e8/2c9002c5-2e8b-4374-9d5d-39767979dbec/MP_EEAAO.jpeg",
        "genre": "Action, Adventure, Comedy",
        "review": "A wild and inventive ride through multiple dimensions, filled with humor and heart.",
        "director": "Daniel Kwan, Daniel Scheinert",
        "cast": ["Michelle Yeoh", " Ke Huy Quan", " Stephanie Hsu", " Jamie Lee Curtis", " Ke Huy Quan"]
        
    },
    {
        "mediaID": 9,
        "movieName": "Jacob's Ladder",
        "releaseDate": "1990-11-02",
        "description": "Mourning his dead child, a haunted Vietnam War veteran attempts to uncover his past while suffering from a severe case of dissociation. To do so, he must decipher reality and life from his own dreams, delusions, and perceptions of death.",
        "runtime": "113 minutes",
        "coverImg": "https://m.media-amazon.com/images/M/MV5BZTg5MTMyNjktNTZhOC00MGFlLWFlMTMtZGU2MjE3OWQ3NjJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        "genre": "Drama, Horror, Mystery",
        "review": "A haunting journey into the fragmented mind of a tortured soul, where reality blurs with nightmare.",
        "director": "Adrian Lyne",
        "cast": ["Tim Robbins ", "Elizabeth Peña ", "Danny Aiello ", "Matt Craven ", "Pruitt Taylor Vince "]
    },
    {
        "mediaID": 10,
        "movieName": "American Psycho",
        "releaseDate": "2000-04-14",
        "description": "A wealthy New York City investment banking executive, Patrick Bateman, hides his alternate psychopathic ego from his co-workers and friends as he delves deeper into his violent, hedonistic fantasies.",
        "runtime": "102 minutes",
        "coverImg": "https://m.media-amazon.com/images/M/MV5BZTM2ZGJmNjQtN2UyOS00NjcxLWFjMDktMDE2NzMyNTZlZTBiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        "genre": "Drama, Horror",
        "review": "A chilling and satirical exploration of the darkness lurking beneath the veneer of 1980s yuppie culture.",
        "director": "Mary Harron",
        "cast": ["Christian Bale ", "Willem Dafoe ", "Jared Leto ", "Josh Lucas ", "Samantha Mathis "]
    },
    {
        "mediaID": 11,
        "movieName": "Fight Club",
        "releaseDate": "1999-10-15",
        "description": "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
        "runtime": "139 minutes",
        "coverImg": "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        "genre": "Drama",
        "review": "A visceral and thought-provoking journey into the depths of modern masculinity and societal discontent.",
        "director": "David Fincher",
        "cast": ["Brad Pitt ", "Edward Norton ", "Helena Bonham Carter ", "Meat Loaf ", "Jared Leto "]
    }
]

*/