package com.example.wheatstone;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.InputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import com.google.gson.Gson;


public class DetailsActivity extends AppCompatActivity {
    private Button SimBtn;
    private ExperimentDataClass experimentsData;

    private TextView aimTextView;
    private TextView requirementsTextView;
    private TextView theoryTextView1;
    private ImageView imgView;
    private TextView theoryTextView2;
    private TextView precautionsTextView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);

        SimBtn = (Button) findViewById(R.id.simulatorBtn);

        Intent intent = getIntent();
        Integer key = intent.getIntExtra("key", 0);

        // Load and parse JSON data
        loadJSONData(key);

        setTitle(experimentsData.getTitle());

        SimBtn.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View V){
                openSimulator();
            }
        });
    }

    private void loadJSONData(Integer expNo){
        try{
            // Read JSON file from assets folder
            InputStream inputStream = getAssets().open("data.json");
            int size = inputStream.available();
            byte[] buffer = new byte[size];
            inputStream.read(buffer);
            inputStream.close();


            // Convert the buffer to a string
            String jsonString = new String(buffer, StandardCharsets.UTF_8);

            // Parse JSON using Gson
            Gson gson = new Gson();
            ExperimentDataClass[] data = gson.fromJson(jsonString, ExperimentDataClass[].class);

            // Assuming the JSON file contains an array of WheatstoneData objects
            if (data != null && data.length > 0) {
                experimentsData = data[expNo];

                // Update UI elements with data
                updateUI();
            }
        }catch (IOException e){
            e.printStackTrace();
        }
    }
    public int getDrawableResourceId(String drawableName) {
        return getResources().getIdentifier(drawableName, "drawable", getPackageName());
    }


    private void updateUI() {
        // Assuming you have TextViews in your layout
        aimTextView = findViewById(R.id.aim_text);
        requirementsTextView = findViewById(R.id.requirements_text);
        theoryTextView1 = findViewById(R.id.theory1_text);
        imgView = findViewById(R.id.imageView);
        theoryTextView2 = findViewById(R.id.theory2_text);
        precautionsTextView = findViewById(R.id.precautions_text);

        // Set data to TextViews
        aimTextView.setText(experimentsData.getAimText());
        requirementsTextView.setText(experimentsData.getRequirementsText());
        theoryTextView1.setText(experimentsData.getTheoryText1());
        theoryTextView2.setText(experimentsData.getTheoryText2());
        precautionsTextView.setText(experimentsData.getPrecautionsText());



        // Assuming experimentsData.getImageUrl() returns a drawable resource name
        String drawableName = experimentsData.getImageUrl();
        int drawableResourceId = getDrawableResourceId(drawableName);

        // Set the image to the ImageView
        imgView.setImageResource(drawableResourceId);

    }
    public void openSimulator(){
        Intent intent = new Intent(this, SimulatorActivity.class);

        intent.putExtra("simulatorUrl",experimentsData.getSimulator());
        intent.putExtra("simulatorTitle", experimentsData.getTitle());
        startActivity(intent);
    }
}

