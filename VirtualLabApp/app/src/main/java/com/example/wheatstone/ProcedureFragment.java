package com.example.wheatstone;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ProcedureFragment extends Fragment {
    private JSONObject experiment;

    public ProcedureFragment() {
        // Required empty public constructor
    }

    public static ProcedureFragment newInstance(JSONObject experiment){
        ProcedureFragment fragment = new ProcedureFragment();
        Bundle args = new Bundle();
        args.putString("experiment", experiment.toString());
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            try {
                experiment = new JSONObject(getArguments().getString("experiment"));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_procedure, container, false);

        ListView listView = view.findViewById(R.id.procedureListView);

        // Get procedure array from experiment data
        try{
            JSONArray procedureArray = experiment.getJSONArray("procedure");
            String[] procedures = new String[procedureArray.length()];
            for(int i=0; i<procedureArray.length(); i++){
                procedures[i] = procedureArray.getString(i);
            }

            // Set up adapter and list view
            ArrayAdapter<String> adapter = new ArrayAdapter<>(requireContext(),R.layout.list_item_reference, R.id.customListView , procedures);
            listView.setAdapter(adapter);
        }catch (JSONException e){
            e.printStackTrace();
        }
        return view;
    }
}