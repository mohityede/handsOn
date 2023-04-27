import Card from "./Card";


// props:
//   data: consists of data records to be rendered
const List = ({ data }) => (
  // data ? (<div className="list">
  //   {/* Your code goes here */ }
  //   {/* Render the Card with required props here */ }
  //   { console.log("data in list componenct:", data.records) }
  //   {/* { data.records.map(curr => {
  //     return <Card key={ curr._id }></Card>
  //   }) } */}
  // </div>) : null

  data.records ? (<div className="list">
    { data.records.map(curr => {
      return <Card key={ curr._id } data={ curr } ></Card>
    }) }
  </div>) : null

);


export default List;