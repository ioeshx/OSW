<?php

class product{
    public $PaintingID;
    public $PaintingName;
    public $AuthorName;
    public $Description;
    public $YearOfWork;
    public $Genre;
    public $Era;
    public $Width;
    public $Height;
    public $Cost;
    public $ImageFileName;
    public $PublisherName;
    public $DatePublished;
    public $Status;

    public function __construct($PaintingID=0, $PaintingName="", $AuthorName="", $Description="", $YearOfWork=-1, $Genre="", $Era="", $Width=-1, $Height=-1,$Cost=-1, $ImageFileName="",$PublisherName="", $DatePublished=null,$Status=-1)
    {
        $this->PaintingID = $PaintingID;
        $this->PaintingName = $PaintingName;
        $this->AuthorName = $AuthorName;
        $this->Description = $Description;
        $this->YearOfWork = $YearOfWork;
        $this->Genre = $Genre;
        $this->Era = $Era;
        $this->Width = $Width;
        $this->Height = $Height;
        $this->Cost = $Cost;
        $this->ImageFileName = $ImageFileName;
        $this->PublisherName = $PublisherName;
        $this->DatePublished = $DatePublished;
        $this->Status = $Status;
    }


}

?>