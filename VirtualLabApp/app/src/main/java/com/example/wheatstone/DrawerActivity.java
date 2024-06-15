package com.example.wheatstone;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Intent;
import android.graphics.PorterDuff;
import android.os.Bundle;
import android.view.MenuItem;

import com.google.android.material.navigation.NavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;

public class DrawerActivity extends AppCompatActivity {
    DrawerLayout drawerLayout;
    NavigationView navigationView;
    Toolbar toolbar;
    private JSONObject[] experiments;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_drawer);

        drawerLayout = findViewById(R.id.drawerLayout);
        navigationView = findViewById(R.id.navigationView);
        toolbar = findViewById(R.id.toolbar);

        // Step 1

        setSupportActionBar(toolbar);

        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawerLayout, toolbar, R.string.OpenDrawer, R.string.CloseDrawer
        );

        drawerLayout.addDrawerListener(toggle);

        toggle.syncState();

        // Get Experiments data from JSON file in assets folder
        String jsonData = loadJSONFromAsset("newData.json");
        try{
            JSONArray jsonArray = new JSONArray(jsonData);
            experiments = new JSONObject[jsonArray.length()];

            for(int i=0; i<jsonArray.length(); i++){
                experiments[i] = jsonArray.getJSONObject(i);
            }
        }
        catch (JSONException e){
            e.printStackTrace();
        }

        Intent intent = getIntent();
        Integer key = intent.getIntExtra("key", 0);

        setTitle(experiments[key].optString("title", ""));

        loadFragment(AimFragment.newInstance(experiments[key]));

        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                int id = item.getItemId();

                if(id == R.id.nav_Aim){
                    loadFragment(AimFragment.newInstance(experiments[key]));
                }
                else if(id == R.id.nav_Theory){
                    loadFragment(TheoryFragment.newInstance(experiments[key]));
                }
                else if(id == R.id.nav_PreTest){
                    try {
                        JSONArray pretestArray = experiments[key].getJSONArray("pretest");
                        loadFragment(PreTestFragment.newInstance(pretestArray));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                else if(id == R.id.nav_Procedure){
                    loadFragment(ProcedureFragment.newInstance(experiments[key]));
                }
                else if(id == R.id.nav_Simulation){
                    loadFragment(SimulationFragment.newInstance(experiments[key]));
                }
//                else if(id == R.id.nav_Result){
//                    loadFragment(new ResultFragment());
//                }
                else if(id == R.id.nav_PostTest){
                    try {
                        JSONArray posttestArray = experiments[key].getJSONArray("posttest");
                        loadFragment(PostTestFragment.newInstance(posttestArray));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                else{
                    loadFragment(ReferencesFragment.newInstance(experiments[key]));
                }

                drawerLayout.closeDrawer(GravityCompat.START);

                return true;
            }
        });
    }

    @Override
    public void onBackPressed() {
        if(drawerLayout.isDrawerOpen(GravityCompat.START)){
            drawerLayout.closeDrawer(GravityCompat.START);
        }
        else{
            super.onBackPressed();
        }
    }

    private void loadFragment(Fragment fragment) {
        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction ft = fm.beginTransaction();

        ft.replace(R.id.container, fragment);
        ft.commit();
    }

    private String loadJSONFromAsset(String fileName){
        String json;
        try{
            InputStream is = getAssets().open(fileName);
            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();
            json = new String(buffer, "UTF-8");
        }
        catch (IOException ex){
            ex.printStackTrace();
            return null;
        }
        return json;
    }
}