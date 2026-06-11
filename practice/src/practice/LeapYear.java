package practice;

public class LeapYear {

	public static void main(String[] args) {
		int year = 2020;
		if(leapYear(year)){
			System.out.println(year +" Is a leap year");
		}
		else {
			System.out.println(year +" Not a leap year");
		}

	}
	static boolean leapYear(int year) {
		return ((year % 4 == 0) || (year % 400 == 0) && (year % 100 != 0));
		
		//return ((year % 4 == 0 && (year % 100 = 0) || (year % 400 == 0);
	}

}
