# Ponkemo-v2
## Intro
This project is my personal take on the Pokemon franchise, seeking to implement as many features of the games as possible while also seeking to ensure the inclusion of every Pokemon and everything that comes with them (something the generation 8 games have failed to do).  The end result may seem a bit like Smogon's Pokemon battle simulator Pokemon Showdown, however something I've always liked doing is catching and training the Pokemon for battle myself so in order to battle, you need to raise your own team.

I have attempted this project once before and in a way this a reinvention/reboot of it, however at its core this project is intended to achieve all the goals I failed to achieve in my first attempt of the project and more.  In regards to the first project I am referring to, it is called Ponkemo and its repository can be found at this link: https://github.com/myarmolinsky/Ponkemo.  To summarize that project, it is a Pokemon catching and training simulator: just a mere fraction of what I intended on implementing.  Due to a lack of foresight on my behalf in regards to the technologies I was using to tackle the ambitious ideas I held in my mind, I ended that project.

I planned to return to the project once I felt more comfortable with a JavaScript based stack, and now I have; I am using the MERN stack to make this project.  Below you will find a growing list of features I have included and features I will include.
## Included Features
- User sign up and log in
- Pokedex (user does not have to be signed in to see this)
  - Each Pokemon on the Pokedex page links to its respective Pokemon page
- Pokemon page for each Pokemon which displays all information about a Pokemon including the Pokemon's:
  - Name
  - Normal and shiny sprites
  - Formes and links to each forme's page
  - Types
  - Abilities and Hidden Ability
  - Weight
  - Base Friendship
  - Gender Ratio
  - Base Stats
  - Egg Groups
  - What its egg hatches into
  - Spawn Rate (currently all 0 or -1)
  - List of Evolutions and how to get them
  - Table of learnable moves and how to learn them
- Egg Groups page showing all Egg Groups
  - Each Egg Group links to its respective Egg Group Page
- Egg Group page for each Egg Group showing all Pokemon in that Egg Group
  - Each Pokemon on the Egg Group page links to its respective Pokemon page
## Planned Features/To-Do List
- Add moves for the rest of the pokemon
- Movedex
  - Moves on Pokemon page are a link to that respective move page
  - Move page shows all Pokemon that can learn the move
  - Edit moves (admin-privilege users only)
- Abilitydex
  - Abilities on Pokemon page are a link to that respective ability page
  - Ability page shows all Pokemon that can have the ability
  - Edit abilities (admin-privilege users only)
- Itemdex
  - Edit items (admin-privilege users only)
- Fix notFound showing up while loading a Pokemon even though the Pokemon exists (should show spinner instead)
- Types pages
  - Types on Pokemon page are links to that respective type page with a type chart
- Users have spawnCounter, item tier points, Pokemon tier points
  - spawnCounter is used for spawning Pokemon, it ensures that it is harder to get a rarer Pokemon
- Spawnrates
  - Give each Pokemon a fair (as fair as possible) spawnrate
- Sort moves on Pokemon page
- Pokedex search/filter
- Dashboard (maybe change the name of dashboard to something else)
  - Catch Pokemon
  - Forage for items
  - Train your Pokemon
  - Breed your Pokemon
  - Recycle Pokemon and Items (for Pokemon tier points and item tier points respectively)
- Sort owned Pokemon
- Shop for buying items and Pokemon with points (specific Pokemon and items and/or packs of random Pokemon and items for their respective points)
- Use items and give items to Pokemon to hold
- Auto-recycle Pokemon option (Give the user the ability to choose the criteria under which a Pokemon gets recycled such as if the Pokemon's IV percentage is lower than a certain amount the user declared)
- Trading Pokemon between users and trading with a CPU
  - CPU trading is intended for if there is no other user on to trade with or if a user does not trust other users to fairly trade (such as trading adn trading back for trade evolutions)
  - CPU trading would cost points
- Battling
- Battle rules
- Contests (Like in Hearthome City in the Sinnoh Region)
- Challenges
  - Bot battles with certain battle criteria
  - Pokedex completion
  - Special badges for completing each challenge
- Dynamax (player must choose between their team having Dynamax or Mega Pokemon and Z moves)
## Notes
- Some Pokemon's evolution conditions have been changed or adjusted
  - Time of day evolutions are out
  - Some Pokemon Egg Groups have been changed (Generation 8 fossil Pokemon)
  - Magnetic field and other odd/specific conditions are out (replaced with stone evolution)
- If you wish to see Pokemon at the current stage of this project, add a file to the config folder called "default.json" and put this text inside it:
```
{
  "mongoURI": "mongodb+srv://Ponkemo:password123@devconnector-1edv7.mongodb.net/Ponkemo"
}
```
