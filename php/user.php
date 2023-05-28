<?php
    class user{
        public $CustomerID;
        public $UserName;
        public $RealName;
        public $Gender;
        public $Birthday;
        public $Address;
        public $Country;
        public $Email;
        public $Phone;

        public function __construct($CustomerID=-1,$UserName="",$RealName="",$Gender="",
                                    $Birthday="",$Address="",$Country="",$Email="",$Phone=""){
            $this->CustomerID = $CustomerID;
            $this->UserName = $UserName;
            $this->RealName = $RealName;
            $this->Gender = $Gender;
            $this->Birthday = $Birthday;
            $this->Address = $Address;
            $this->Country = $Country;
            $this->Email = $Email;
            $this->Phone = $Phone;                    
        }
    }
?>