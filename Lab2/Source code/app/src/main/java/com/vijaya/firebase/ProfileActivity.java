package com.vijaya.firebase;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.squareup.picasso.Picasso;

import de.hdodenhof.circleimageview.CircleImageView;

public class ProfileActivity extends AppCompatActivity {

    String personName ;
    String personGivenName ;
    String personFamilyName ;
    String personEmail ;
    String personId ;
    Uri personPhoto ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        GoogleSignInAccount acct = GoogleSignIn.getLastSignedInAccount(ProfileActivity.this);
        if (acct != null) {
            personName = acct.getDisplayName();
            personGivenName = acct.getGivenName();
            personFamilyName = acct.getFamilyName();
            personEmail = acct.getEmail();
            personId = acct.getId();
            personPhoto = acct.getPhotoUrl();
        }


        CircleImageView profile = (CircleImageView) findViewById(R.id.profile);
        Picasso.get().load(personPhoto).into(profile);
//        profile.setImageURI(personPhoto);

        TextView name = (TextView)findViewById(R.id.name);
        name.setText(personName);

        EditText givenname = (EditText)findViewById(R.id.blood_group);
        givenname.setText(personGivenName);

        EditText familyname = (EditText)findViewById(R.id.education);
        familyname.setText(personFamilyName);

        EditText email = (EditText)findViewById(R.id.occupation);
        email.setText(personEmail);

        final ImageView edit =(ImageView)findViewById(R.id.edit);
        edit.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // your code here
                Toast.makeText(ProfileActivity.this, "Succefully Saved", Toast.LENGTH_SHORT).show();
            }
        });
//Toast.makeText(ForgotPasswordActivity.this, "Failed to send reset email!", Toast.LENGTH_SHORT).show();
    }
}