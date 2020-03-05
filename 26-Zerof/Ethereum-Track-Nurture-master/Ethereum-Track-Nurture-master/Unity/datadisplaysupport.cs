using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using UnityEngine.UI;

using UnityEngine.SceneManagement;
public  class datadisplaysupport : MonoBehaviour
{

    /* public static string pincodestr;
      public static string housenostr;
      public static string streetnamestr;
      public static string citystr;
      public static string statestr;
      public static string landmarkstr;*/
    public static string usernamestr;
    public static string emailstr;
    public static string phonenumberstr;


    /* public Text pincodetext;
     public Text housenotext;
     public Text streetnametext;
     public Text citytext;
     public Text statetext;
     public Text landmarktext;*/
    public Text usernametext;
    public Text emailtext;
    public Text phonenumbertext;

    // Start is called before the first frame update
    void Start()
    {
        /*  pincodetext.text = pincodestr;
          housenotext.text = housenostr;
          streetnametext.text = streetnamestr;
          citytext.text = citystr;
          statetext.text = statestr;
          landmarktext.text = landmarkstr;*/
        usernametext.text = usernamestr;
        emailtext.text = emailstr;
        phonenumbertext.text = phonenumberstr;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
