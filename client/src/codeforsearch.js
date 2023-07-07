const [allData, setAllData] = useState([])

useEffect(() => {
    fetch("https://api.scryfall.com/sets")
          .then((response) => response.json())
          .then((parsed)=>{
                setAllData(parsed.data)
      })
      .catch((error) => {
          console.log(error);
      })
  }, []);

const setTypes = allData.map((dataPoint)=>{
    return dataPoint.set_type
})


  const onlyUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  }
  
  var unique = setTypes.filter(onlyUnique);
  




  const setsToDraft = allData.filter((data)=>{
    return (data.set_type === "masters" || data.set_type === "expansion" || data.set_type === "core" || data.set_type === "draft_innovation") && (data.released_at < Date.now)
})



const setsToDraftName = setsToDraft.map((set)=>{
    return set.name
})


const setsToDraftIcons = setsToDraft.map((set)=>{
    return set.icon_svg_uri 
})



          {/* <SetsList>
              {
            setsToDraft.map( (set) => 
            <Sets key={set.id} className="dropdown">{set.name} <Image key={set.id} src={set.icon_svg_uri}/> </Sets> 
            )
            }
            </SetsList>
          {pack && <Pack>
            {pack.map((cards)=>{
              return <PackImage key={cards.id} src={cards.image_uris.png}/>
            })}
          </Pack>} */}