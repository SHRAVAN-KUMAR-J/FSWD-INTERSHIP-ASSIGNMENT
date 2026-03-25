import react from "react";
function SearchBar({search,setSearch}){
    return(
        <div>
            <input type="text" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
    )
}
export default SearchBar;