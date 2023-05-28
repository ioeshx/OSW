<?php

class product{
    public int $PaintingID;
    public string $PaintingName;
    public string $AuthorName;
    public string $Description;
    public int $YearOfWork;
    public String $Genre;
    public String $Era;
    public int $Width;
    public int $Height;
    public float $Cost;
    public String $ImageFileName;
    public String $PublisherName;
    public $DatePublished;
    public int $Status;

    /**
     * @param int $PaintingID
     * @param string $PaintingName
     * @param string $AuthorName
     * @param string $Description
     * @param int $YearOfWork
     * @param string $Genre
     * @param string $Era
     * @param int $Width
     * @param int $Height
     * @param float $Cost
     * @param string $ImageFileName
     * @param string $PublisherName
     * @param $DatePublished
     * @param int $Status
     */
    public function __construct(int $PaintingID=0, string $PaintingName="", string $AuthorName="", string $Description="", int $YearOfWork=-1, string $Genre="", string $Era="", int $Width=-1, int $Height=-1, float $Cost=-1, string $ImageFileName="", string $PublisherName="", $DatePublished=null, int $Status=-1)
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