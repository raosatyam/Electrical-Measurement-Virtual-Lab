package com.example.wheatstone;

public class ExperimentDataClass{
    private String title;
    private String aimText;
    private String requirementsText;
    private String theoryText1;
    private String imageUrl;
    private String theoryText2;
    private String precautionsText;
    private String simulator;

    // Getters and setters

    public String getTitle(){
        return title;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public String getAimText() {
        return aimText;
    }

    public void setAimText(String aimText) {
        this.aimText = aimText;
    }

    public String getRequirementsText() {
        return requirementsText;
    }

    public void setRequirementsText(String requirementsText) {
        this.requirementsText = requirementsText;
    }

    public String getTheoryText1() {
        return theoryText1;
    }

    public void setTheoryText1(String theoryText1) {
        this.theoryText1 = theoryText1;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTheoryText2() {
        return theoryText2;
    }

    public void setTheoryText2(String theoryText2) {
        this.theoryText2 = theoryText2;
    }

    public String getPrecautionsText() {
        return precautionsText;
    }

    public void setPrecautionsText(String precautionsText) {
        this.precautionsText = precautionsText;
    }

    public String getSimulator() {
        return simulator;
    }

    public void setSimulator(String simulator) {
        this.simulator = simulator;
    }
}
