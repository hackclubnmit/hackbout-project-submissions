import React, { Component } from 'react';
import { Image, Text, View  , FlatList, StyleSheet,Button} from 'react-native';

export default class App extends Component {

  renderHeader = () => {
    //View to set in Header
    return(
      <View style={styles.header_footer_style}>
        <Text style={styles.textStyle}> This is Header </Text>
      </View>
    );
  };   
    

  render() {
    return (

      <FlatList 
      style={{marginTop:5}}
      data={[
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          
        },
      ]}
        data2={[
          {
            id:"dlssmflsm"
          }

        ]}
      
     
      renderItem={({item})=>(
        
      <View style={{margin:5 , backgroundColor:'#fff' , elevation:5}}>
          <Image
          style={{ height: 150 , flex:1 , width:'100%' }}
          source={{ uri: 'https://img.traveltriangle.com/blog/wp-content/uploads/2018/01/FotoJetdjgfurei687497.jpg' }}
         
        />
        
           <View style={{flexDirection:'row', alignItems:'center'}}>

        <View style={{ flex:1 }}>
        

        </View>
          
          <View style={{flex:2 , marginLeft:10, justifyContent:'center' ,flexDirection:'row' }}>
      <Text style={{flex:1,fontWeight:"bold"}}>{item.title}</Text>
      <Text style={{flex:1}}>{item.ago}</Text>
          </View>
          
           </View>

          < Text style={{paddingLeft:0 , paddingRight:10,fontSize:18 }}>Amrita Cafe</Text> 
          < Text style={{paddingLeft:0 , paddingRight:10,fontSize:15,color:'#9d9d9d' }}>13,3rd floor</Text> 
          < Text style={{paddingLeft:0 , paddingRight:10,fontSize:15,color:'#9d9d9d' }}>Koramangala-560603</Text> 
          <View style={{width:'13%',marginLeft:4,borderRadius:100}}>
          <Text style={{paddingLeft:3, paddingRight:0,backgroundColor:'green',color:'#fff' }}>4.6 ⭐</Text>
          </View>
          
          < Text style={{paddingLeft:90 , paddingRight:10,fontSize:22 }}>Facilities Provided</Text> 
          
          < Text style={{paddingLeft:0 , paddingRight:10,fontSize:18 }}>  📶Wifi ❄️AC 🎫Coupon 💻PC 🔌Plug </Text> 
          <Button onPress={this.gotoNextActivity} title='Click here for Surprise' />

          </View>
           
          
          
          
          
          
      
    
      
      
       
    
      
      )}
      
      keyExtractor={item=>item.id}
/>



      
      
    );
    

  }
}
