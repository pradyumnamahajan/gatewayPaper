<h1 align="center">TOTP Based Gateway Authentication system</h1>

<p align="center">
    
</p>

This is the implementation of the system described in [TOTP Based Authentication Using QR Code for Gateway Entry System](http://ijecs.in/index.php/ijecs/article/view/4481/3953)

<br/>
<p align="center">
<img src="./images/demo50.gif" height="50%" width="50%">
</p>
<br/>
The primary objective of this research project is to introduce a secure authentication method for gateway entry system that complements the one currently in use. The proposed system will use QR code, Time-based-One-Time-Password (TOTP) and Biometrics with the aim of increasing the security and reducing the cost of the system.



## Demo

<a href="https://i.imgur.com/jxZXZr1.mp4">Registration</a> - Complete registration process.
<br />
<a href="./images/demo50.gif">Successful Entry</a> - Access is granted when App is used.
<br />
<a href="https://i.imgur.com/W8gnYLx.mp4">Unsuccessful Entry</a> - When a screenshot of an earlier QR code is used, access is denied.
<br />
<br />
<a href="https://totp-gateway.herokuapp.com">Website</a> - Site used for Verification.
<p>


## How it works

1.	The user is required to enter the authorised email ID and password in order to login. First time users need to register in order to proceed.
2.	After registration, a verification email is sent to the authorised email ID. Upon verification, the user is allowed to login.
3.	Once login is done, the shared secret key is sent to the user and also stored in the app. This key is used to generate the TOTP which is embedded in the QR code.
4.	The QR code is then scanned using a QR code scanner. This TOTP is then compared with the TOTP generated in the server.
5.  If both the TOTPs match, then the user is allowed to enter, otherwise entry is not allowed.

## Authors
<a href="https://github.com/pradyumnamahajan">Pradyumna Mahajan</a> • <a href="https://github.com/AbhishekA10">Abhishek Arvind</a> • <a href="https://github.com/rishikeshchalke2207">Rishikesh Chalke</a>  
