<?php

class product{
    public $PaintingID;
    public $PaintingName;
    public $AuthorName;
    public $Description;
    public $YearOfWork;
    public $GenreID;
    public $EraID;
    public $Width;
    public $Height;
    public $Cost;
    public $Image;
    public $PublisherName;
    public $DatePublished;
    public $Status;

    function __construct($PaintingID, $PaintingName, $AuthorName, $Description, $YearOfWork, $GenreID, $EraID, $Width, $Height, $Cost, $Image, $PublisherName, $DatePublished, $Status){
        $this->PaintingID = $PaintingID;
        $this->PaintingName = $PaintingName;
    }
}

?>