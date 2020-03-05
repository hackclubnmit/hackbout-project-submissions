using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Mirror;
using UnityEngine.UI;
using UnityEngine.UIElements;
using UnityEngine.SceneManagement;

public class CustomNetworkRoomManager : NetworkRoomManager
{
    [SerializeField]
    GameObject lobbyScrollView;

    public override void OnGUI()
    {
        lobbyScrollView = GameObject.Find("LobbyScrollView");
        
    }
}

