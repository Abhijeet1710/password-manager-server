const bcrypt = require("bcrypt");

const check = (userName, masterPassword, hashedPassword) => {
    const userpass = `${userName}${masterPassword}`;
    bcrypt.compare(userpass, hashedPassword, function (err, result) {
      // if(err) console.log(err);
      console.log(result); 
    });
};

const makeHash = async (userName, masterPassword) => {
    const userpass = `${userName}${masterPassword}`;
    const hashedPassword = await bcrypt.hash(userpass, 12);
    console.log(hashedPassword);
}


// makeHash("Abhijeet1710", "khamkar@1710");
check("Abhijeet1710", "khamkar@1710", "$2b$12$xp0AXG.9nARxk1I9OGvGIOQ1TCUAlqBuJ7fmMj2IsLJ1.srM506TW");
// "$2b$12$OK3qi0TXj2b1a3NtqUvXS.JOSUBuVo.z7n1jt6Y7g4oT.nFn6eDrC"