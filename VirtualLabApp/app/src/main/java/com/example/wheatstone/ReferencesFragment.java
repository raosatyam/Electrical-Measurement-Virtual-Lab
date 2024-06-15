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

public class ReferencesFragment extends Fragment {
    private JSONObject experiment;

    public ReferencesFragment() {
        // Required empty public constructor
    }

    // Create a new instance of the fragment
    public static ReferencesFragment newInstance(JSONObject experiment){
        ReferencesFragment fragment = new ReferencesFragment();
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
        View view = inflater.inflate(R.layout.fragment_references, container, false);

        ListView listView = view.findViewById(R.id.referenceListView);

        // Get references array from experiment data
        try {
            JSONArray referencesArray = experiment.getJSONArray("references");
            String[] references = new String[referencesArray.length()];
            for (int i = 0; i < referencesArray.length(); i++) {
                references[i] = referencesArray.getString(i);
            }

            // Set up adapter and list view
            ArrayAdapter<String> adapter = new ArrayAdapter<>(requireContext(), R.layout.list_item_reference, R.id.customListView, references);
            listView.setAdapter(adapter);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return view;
    }
}