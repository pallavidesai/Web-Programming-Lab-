package com.vijaya.firebase.ui.main;

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.annotation.StringRes;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import com.vijaya.firebase.R;
import com.vijaya.firebase.Tab1;
import com.vijaya.firebase.Tab2;
import com.vijaya.firebase.Tab3;

/**
 * A [FragmentPagerAdapter] that returns a fragment corresponding to
 * one of the sections/tabs/pages.
 */
public class SectionsPagerAdapter extends FragmentPagerAdapter {

    @StringRes
    private static final int[] TAB_TITLES = new int[]{R.string.tab_text_1, R.string.tab_text_2,R.string.tab_text_3};
    private final Context mContext;
    int noOfTabs;

    public SectionsPagerAdapter(Context context, FragmentManager fm,int Numberoftabs) {
        super(fm);
        mContext = context;
        this.noOfTabs = Numberoftabs;
    }

    @Override
    public Fragment getItem(int position) {
        // getItem is called to instantiate the fragment for the given page.
        // Return a PlaceholderFragment (defined as a static inner class below).
        switch(position)
        {
            case 0:
                Tab1 tab1= new Tab1();
                return tab1;
            case 1:
                Tab2 tab2= new Tab2();
                return tab2;
            case 2:
                Tab3 tab3= new Tab3();
                return tab3;

        }

        return PlaceholderFragment.newInstance(position + 1);
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return mContext.getResources().getString(TAB_TITLES[position]);
    }

    @Override
    public int getCount() {
        // Show 3 total pages.
        return 3;
    }
}