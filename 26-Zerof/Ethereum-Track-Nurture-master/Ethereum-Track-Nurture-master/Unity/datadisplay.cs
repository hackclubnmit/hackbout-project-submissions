using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class datadisplay : MonoBehaviour
{

   /* public InputField pincode;
    public InputField houseno;
    public InputField streetname;
    public InputField city;
    public InputField state;
    public InputField landmark;*/
    public InputField username;
    public InputField email;
    public InputField phonenumber;


    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void loaddatainnextscene()
    {
        
        

        /*datadisplaysupport.pincodestr = pincode.text;
        datadisplaysupport.housenostr = houseno.text;
        datadisplaysupport.streetnamestr = streetname.text;
        datadisplaysupport.citystr = city.text;
        datadisplaysupport.statestr = state.text;
        datadisplaysupport.landmarkstr = landmark.text;*/
        datadisplaysupport.usernamestr = username.text;
        datadisplaysupport.emailstr = email.text;
        datadisplaysupport.phonenumberstr = phonenumber.text;

    }
    
}
