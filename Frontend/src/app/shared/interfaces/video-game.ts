export interface VideoGame {
    mediaID: number,
    gameName: string,
    releaseDate: string,
    description: string,
    coverImg: string,
    genre: string,
    review: string,
    publisher: string,
    platforms: string[]
}

export interface VideoGameAddition {
    mediaID: number,
    gameName: string,
    releaseDate: string,
    description: string,
    coverImg: string,
    genre: string,
    review: string,
    publisher: string,
    platforms: string
}

// export const manyVideoGames: VideoGame[] = [
//     {
//         "mediaID": 12,
//         "gameName": "Silent Hill 2",
//         "releaseDate": "September 24, 2001",
//         "description": "Silent Hill 2 is a survival horror video game developed by Team Silent and published by Konami. It serves as a sequel to the first Silent Hill game, following James Sunderland as he searches for his deceased wife in the mysterious town of Silent Hill.",
//         "coverImg": "https://assetsio.gnwcdn.com/co2vyg.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
//         "genre": "Survival horror",
//         "review": "Silent Hill 2 is a psychological horror masterpiece known for its deep storyline, immersive atmosphere, and innovative use of psychological horror elements. Despite some dated controls and occasional camera issues, its multiple endings and haunting soundtrack make it a must-play for fans of the genre.",
//         "publisher": "Konami",
//         "platforms": ["PlayStation 2 ", " Xbox", " Microsoft Windows"]
//     },
//     {
//         "mediaID": 13,
//         "gameName": "Silent Hill 3",
//         "releaseDate": "May 23, 2003",
//         "description": "Silent Hill 3 is a survival horror video game developed by Team Silent and published by Konami. It is a direct sequel to the first Silent Hill game, following Heather Mason as she navigates through the horrors of Silent Hill.",
//         "coverImg": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1057256e-383f-4417-a343-5eae9d369263/ddxi740-9d6b48c6-cecf-402c-b888-ef33d8dc57e1.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEwNTcyNTZlLTM4M2YtNDQxNy1hMzQzLTVlYWU5ZDM2OTI2M1wvZGR4aTc0MC05ZDZiNDhjNi1jZWNmLTQwMmMtYjg4OC1lZjMzZDhkYzU3ZTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wNw4sDf1Bm0qvPs6ExbrkrBHvu4TWyzLMagiUpTm1Zc",
//         "genre": "Survival horror",
//         "review": "Silent Hill 3 serves as a worthy successor, continuing the series' tradition of psychological horror with improved graphics and sound design. While some may find it repetitive or linear, its engaging puzzles and strong character development make it a compelling experience.",
//         "publisher": "Konami",
//         "platforms": ["PlayStation 2 ", " Microsoft Windows"]
//      },
//     {
//         "mediaID": 14,
//         "gameName": "Resident Evil 4",
//         "releaseDate": "January 11, 2005",
//         "description": "Resident Evil 4 is a survival horror action-adventure game developed and published by Capcom. It follows Leon S. Kennedy as he investigates the kidnapping of the U.S. President's daughter in a rural part of Europe, encountering a new threat known as Los Illuminados.",
//         "coverImg": "https://i.ebayimg.com/images/g/EcMAAOSwhQJkAlal/s-l1200.webp",
//         "genre": "Survival horror, Third-person shooter",
//         "review": "Resident Evil 4 is a groundbreaking entry in the survival horror genre, praised for its intense gameplay, immersive atmosphere, and well-designed enemies. Despite a shift towards action and a convoluted storyline, its strategic shooting mechanics and replay value make it a standout title.",
//         "publisher": "Capcom",
//         "platforms": ["GameCube ", " PlayStation 2", " Microsoft Windows", " Wii", " iOS", " Android", " PlayStation 3", " Xbox 360", " PlayStation 4", " Xbox One", " Nintendo Switch"]
//      },
//      {
//         "mediaID": 15,
//         "gameName": "Half-Life 2",
//         "releaseDate": "November 16, 2004",
//         "description": "Half-Life 2 is a first-person shooter game developed and published by Valve Corporation. It follows Gordon Freeman as he fights against the alien Combine empire in a dystopian future Earth.",
//         "coverImg": "https://assetsio.gnwcdn.com/co1nmw.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
//         "genre": "First-person shooter",
//         "review": "Half-Life 2 is an iconic masterpiece that redefined the first-person shooter genre with its immersive storytelling and revolutionary physics-based gameplay. Despite pacing issues and dated graphics, its memorable characters and modding community ensure its lasting legacy.",
//         "publisher": "Valve Corporation",
//         "platforms": ["Microsoft Windows ", " Xbox", " PlayStation 3", " Linux", " Mac OS"]
//     },
//      {
//         "mediaID": 16,
//         "gameName": "Resident Evil 2 Remake",
//         "releaseDate": "January 25, 2019",
//         "description": "Resident Evil 2 is a survival horror game developed and published by Capcom. It is a remake of the 1998 game Resident Evil 2, following protagonists Leon S. Kennedy and Claire Redfield as they navigate through Raccoon City during a zombie apocalypse.",
//         "coverImg": "https://steamuserimages-a.akamaihd.net/ugc/938320777502349153/A23419F5A98D244A523B5B96BA4E868B834F987A/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
//         "genre": "Survival horror",
//         "review": "Resident Evil 2 Remake is a faithful and terrifying reimagining of a survival horror classic, featuring stunning visuals, redesigned gameplay mechanics, and compelling narrative. Despite performance issues and occasional tedium, its unlockables and additional modes offer plenty of replay value.",
//         "publisher": "Capcom",
//         "platforms": ["Microsoft Windows ", " PlayStation 4", " Xbox One"]
//     },
//     {
//         "mediaID": 17,
//         "gameName": "Portal",
//         "releaseDate": "October 10, 2007",
//         "description": "Portal is a first-person puzzle-platform game developed and published by Valve Corporation. It revolves around solving puzzles using the 'Aperture Science Handheld Portal Device' under the guidance of an artificial intelligence named GLaDOS.",
//         "coverImg": "https://assetsio.gnwcdn.com/co1x7d.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
//         "genre": "Puzzle-platform",
//         "review": "Portal is a mind-bending puzzle game praised for its innovative gameplay mechanics, witty writing, and clever level design. While relatively short and lacking in narrative depth, its perfect pacing and memorable moments ensure a memorable experience.",
//         "publisher": "Valve Corporation",
//         "platforms": ["Microsoft Windows ", " Mac OS X", " Linux", " PlayStation 3", " Xbox 360"]
//     }
    
// ]
