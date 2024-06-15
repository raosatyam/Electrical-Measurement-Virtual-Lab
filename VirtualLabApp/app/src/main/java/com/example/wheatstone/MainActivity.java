package com.example.wheatstone;
import java.util.HashMap;
import  java.util.Map;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.util.HashMap;

public class MainActivity extends AppCompatActivity {
private Map<CardView,Integer> cardViewActivityMap = new HashMap<>();
    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

            CardView wheatstone = (CardView) findViewById(R.id.wheatstone_id);
            CardView maxwell = (CardView) findViewById(R.id.maxwell_id);
            CardView owens = (CardView) findViewById(R.id.owens_id);
            CardView schering = (CardView) findViewById(R.id.schering_id);
            CardView wiens_series = (CardView) findViewById(R.id.wiens_series_id);
            CardView anderson = (CardView) findViewById(R.id.anderson_id);
            CardView wien_robinson = (CardView) findViewById(R.id.wien_robinson_id);
            CardView hays = (CardView) findViewById(R.id.hays_id);

            cardViewActivityMap.put(wheatstone, 0);
            cardViewActivityMap.put(maxwell, 1);
            cardViewActivityMap.put(owens, 2);
            cardViewActivityMap.put(schering, 3);
            cardViewActivityMap.put(anderson,4);
            cardViewActivityMap.put(wiens_series, 5);
            cardViewActivityMap.put(wien_robinson, 6);
            cardViewActivityMap.put(hays,7);

            for(Map.Entry<CardView, Integer> item : cardViewActivityMap.entrySet()){
                CardView cardView = item.getKey();
                final Integer targetActivityInd = item.getValue();

                cardView.setOnClickListener(new View.OnClickListener(){
                    @Override
                    public void onClick(View V){
                        openDetails(targetActivityInd);
                    }
                });
            }
    }

    public void openDetails(Integer detailsActivityFile){
//        Intent intent = new Intent(this, DetailsActivity.class);
//        intent.putExtra("key", detailsActivityFile);
        Intent intent = new Intent(this, DrawerActivity.class);
        intent.putExtra("key", detailsActivityFile);
        startActivity(intent);
    }
}