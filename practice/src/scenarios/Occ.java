package scenarios;

public class Occ {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String s = "I am going to my native place on coming sunday";
		int[] arr = new int[123];
		for(int i = 0; i<s.length();i++) {
			char ch = s.charAt(i);
			arr[ch]++;
		}
		for(int i = 0; i<arr.length; i++) {
			if(arr[i]>3) {
				System.out.println((char)i+"-------------->"+arr[i]);
			}
		}
	}

}
