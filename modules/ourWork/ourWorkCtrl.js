var ourWorkCount = 0;

angular.module('ourWorkModule').controller('ourWorkController',function($scope){

	//Show 'nav'-menu
	$("nav").css("display","block");
	
	//This page content correction
	$scope.$emit('ngViewChanged',"ourWorkController");
	
	//Counting how many times this controller starting
	ourWorkCount++;
	if (ourWorkCount==1)
		slider();
	else
		ourWorkCount = 0;
		
	function slider(){
		$scope.galleries = [];
		$scope.loadedImage = [];
		
		function getId() {
			var id = 0;
			return function() {
				id++;
				return "slider"+id;
			}
		}
		var outerId = getId();
		
		// Object #12
		let gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object12/1.jpg","images/ourWork/Object12/2.jpg","images/ourWork/Object12/3.jpg");
		gallery.setterString(
			{
				objectNumber: 12,
				title: 'Сонячна електростанція потужністю 34,5 кВт. Підключена до "зеленого тарифу."',
				location: 'Івано-Франківська область.',
				content: 'Сонячні монокристалічні панелі - Longi Solar 345 Вт - 100 шт., з гарантією на 25 років. & Працює система разом з двома інверторами фірми Q3 Energie 15 кВт (Німеччина). Гарантія на інвертори 5 років.'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #11
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object11/1.jpg","images/ourWork/Object11/2.jpg","images/ourWork/Object11/3.jpg");
		gallery.setterString(
			{
				objectNumber: 11,
				title: 'Сонячна електростанція потужністю 32,23 кВт. Підключена до "зеленого тарифу."',
				location: 'Івано-Франківська область.',
				content: 'Оподаткований дохід від СЕС становитиме $6000 щороку. & Сонячні монокристалічні панелі - Longi Solar 345 Вт та 290 Вт, 32 шт., з гарантією на 25 років. & Працює система разом з двома інверторами фірми Q3 Energie 15 кВт (Німеччина). Гарантія на інвертори 5 років.'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #10
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object10/1.jpg","images/ourWork/Object10/2.jpg","images/ourWork/Object10/3.jpg");
		gallery.setterString(
			{
				objectNumber: 10,
				title: 'Сонячна електростанція потужністю 11,52 кВт. Підключена до "зеленого тарифу."',
				location: 'м. Івано-Франківськ.',
				content: 'Сонячні панелі - Sharp 360 Вт, 32 шт., виробництва Німеччини з гарантією на 25 років. & Працює система разом з інвертором фірми Q3 Energie 10 кВт (Німеччина). Гарантія на інвертори 5 років.'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #9
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object9/1.jpg","images/ourWork/Object9/2.JPG","images/ourWork/Object9/3.jpg","images/ourWork/Object9/4.JPG","images/ourWork/Object9/5.jpg","images/ourWork/Object9/6.jpg");
		gallery.setterString(
			{
				objectNumber: 9,
				title: 'Сонячна електростанція потужністю 11,88 кВт. Підключена до "зеленого тарифу".',
				location: 'м. Івано-Франківськ.',
				content: 'Сонячні панелі - Sharp 360 Вт, 33 шт., виробництва Німеччини з гарантією на 25 років. & Працює система разом з інвертором фірми Q3 Energie 10 кВт (Німеччина). Гарантія на інвертори 5 років.'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #8
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object8/1.jpg","images/ourWork/Object8/2.jpg","images/ourWork/Object8/3.jpg","images/ourWork/Object8/4.jpg");
		gallery.setterString(
			{
				objectNumber: 8,
				title: 'Сонячна електростанція потужністю 27,7кВт. Підключена до "зеленого тарифу".',
				location: 'Івано-Франківська область.',
				content: 'Сонячні панелі - SHARP 68шт., 360 Вт (Німеччина) та Longi Solar 11шт., 290Вт з гарантією на 25 років & Панелі змонтовано на оригінальній конструкції для металочерепиці. & Система працює з двома інверторами фірми QX3 (Німеччина). Гарантія на інвертори 5 років.'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #7
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object7/1.JPG","images/ourWork/Object7/2.JPG","images/ourWork/Object7/3.jpg","images/ourWork/Object7/4.jpg");
		gallery.setterString(
			{
				objectNumber: 7,
				title: 'Сонячна електростанція потужністю 21кВт. Підключена до "зеленого тарифу".',
				location: 'Івано-Франківська область.',
				content: 'Сонячні панелі - Aleo Solar 70шт. 300Вт (Німеччина). Преміальна серія з рамою на 5см та гарантією на 25 років. & Панелі змонтовано на оригінальній монтажній конструкції для бітумної черепиці. & Працює система разом з двома інверторами фірми QX3 (Німеччина). Гарантія на інвертори 5 років.'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #6
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object6/1.jpg","images/ourWork/Object6/2.jpg","images/ourWork/Object6/3.jpg","images/ourWork/Object6/4.jpg","images/ourWork/Object6/5.jpg");
		gallery.setterString(
			{
				objectNumber: 6,
				title: 'Сонячна електростанція потужністю 15,12кВт. Підключена до "зеленого тарифу"',
				location: 'Івано-Франківська область.',
				content: 'Сонячні панелі - Trina Solar 56шт. 270Вт (Китай) та гарантією на 25 років. Розміщені на оригінальній монтажній конструкції на двох дахах. & Працює система разом з інвертором фірми QX3 (Німеччина). Гарантія на інвертор 5 років. & Орієнтований дохід від СЕС - 2000 Євро щороку.'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #5
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object5/1.JPG","images/ourWork/Object5/2.JPG","images/ourWork/Object5/3.JPG","images/ourWork/Object5/4.JPG");
		gallery.setterString(
			{
				objectNumber: 5,
				title: 'Сонячна електростанція потужністю 16,7кВт. Підключена до "зеленого тарифу".',
				location: 'Івано-Франківська область.',
				content: 'Сонячні панелі - SHARP 62шт, 270Вт (Німеччина). Гарантія на  25 років. Панелі змонтовано на оригінальній монтажній конструкції на двох дахах. & Система працює разом з інвертором фірми QX3 (Німеччина). Гарантія на інвертор 5 років.'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #4
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object4/1.jpg","images/ourWork/Object4/2.jpg","images/ourWork/Object4/3.jpg","images/ourWork/Object4/4.jpg","images/ourWork/Object4/5.jpg");
		gallery.setterString(
			{
				objectNumber: 4,
				title: 'Сонячна електростанція потужністю 16,7кВт. Підключена до "зеленого тарифу".',
				location: 'Івано-Франківська область.',
				content: 'Сонячні панелі - SHARP 62шт. 270Вт (Німеччина), гарантія 25 років. Розміщені на оригінальній монтажній конструкції  на двох дахах. & Працює система разом з інвертором фірми QX3 (Німеччина). Гарантія на інвертор 5 років.'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #3
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object3/1.jpg","images/ourWork/Object3/2.jpg","images/ourWork/Object3/3.jpg","images/ourWork/Object3/4.jpg");
		gallery.setterString(
			{
				objectNumber: 3,
				title: 'Сонячна електростанція потужністю 17,7кВт. Підключена до "зеленого тарифу"',
				location: 'Івано-Франківська область.',
				content: 'Сонячні панелі - Aleo Solar 59шт. 260Вт (Німеччина). Преміальна серія з рамою на 5см та гарантією 25 років. & Панелі розміщені на оригінальній монтажній конструкції для бітумної черепиці та працюють разом з двома інверторами фірми QX3 (Німеччина). & Гарантія на інвертори 5 років. Окупність проекту 5-6 років.'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #2
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object2/1.jpg","images/ourWork/Object2/2.jpg","images/ourWork/Object2/3.jpg","images/ourWork/Object2/4.jpg");
		gallery.setterString(
			{
				objectNumber: 2,
				title: 'Сонячна електростанція на 7,28кВт. Підключена до "зеленого тарифу".',
				location: 'Івано-Франківська область.',
				content: 'Сонячні панелі - SHARP 260 (Німеччина), розміщені на оригінальній монтажній конструкції та працюють разом з інвертором фірми QX3 (Німеччина).'
			}
		);
		$scope.galleries.push(gallery);
		
		// Object #1
		gallery=new Gallery(outerId());
		gallery.setterImages("images/ourWork/Object1/1.jpg","images/ourWork/Object1/2.jpg","images/ourWork/Object1/3.jpg","images/ourWork/Object1/4.jpg");
		gallery.setterString(
			{
				objectNumber: 1,
				title: 'Сонячна електростанція потужністю 7,8кВт. Підключена до "зеленого тарифу".',
				location: 'Місце: Івано-Франківська область.',
				content: 'Сонячні панелі - SHARP 260 (Німеччина), розміщені на оригінальній монтажній конструкції та працюють разом з інвертором фірми SMA (Німеччина).'
			}
		);
		$scope.galleries.push(gallery);
		
		$scope.galleries.forEach(function(index) {
			$scope.loadedImage.push(false);
		});
		
		/*gallery=new Gallery(outerId[1]);
		gallery.setter("images/ourWork/Object8/1.jpg","images/ourWork/Object8/2.jpg","images/ourWork/Object8/3.jpg","images/ourWork/Object8/4.jpg");
		$scope.galleries.push(gallery);
		
		gallery=new Gallery(outerId[2]);
		gallery.setter("images/ourWork/Object7/1.JPG","images/ourWork/Object7/2.JPG","images/ourWork/Object7/3.jpg","images/ourWork/Object7/4.jpg");
		$scope.galleries.push(gallery);
		
		gallery=new Gallery(outerId[3]);
		gallery.setter("images/ourWork/Object6/1.jpg","images/ourWork/Object6/2.jpg","images/ourWork/Object6/3.jpg","images/ourWork/Object6/4.jpg","images/ourWork/Object6/5.jpg");
		$scope.galleries.push(gallery);
		
		gallery=new Gallery(outerId[4]);
		gallery.setter("images/ourWork/Object5/1.JPG","images/ourWork/Object5/2.JPG","images/ourWork/Object5/3.JPG","images/ourWork/Object5/4.JPG");
		$scope.galleries.push(gallery);
		
		gallery=new Gallery(outerId[5]);
		gallery.setter("images/ourWork/Object4/1.jpg","images/ourWork/Object4/2.jpg","images/ourWork/Object4/3.jpg","images/ourWork/Object4/4.jpg","images/ourWork/Object4/5.jpg");
		$scope.galleries.push(gallery);
		
		gallery=new Gallery(outerId[6]);
		gallery.setter("images/ourWork/Object3/1.jpg","images/ourWork/Object3/2.jpg","images/ourWork/Object3/3.jpg","images/ourWork/Object3/4.jpg");
		$scope.galleries.push(gallery);
		
		gallery=new Gallery(outerId[7]);
		gallery.setter("images/ourWork/Object2/1.jpg","images/ourWork/Object2/2.jpg","images/ourWork/Object2/3.jpg","images/ourWork/Object2/4.jpg");		
		$scope.galleries.push(gallery);
		
		gallery=new Gallery(outerId[8]);
		gallery.setter("images/ourWork/Object1/1.jpg","images/ourWork/Object1/2.jpg","images/ourWork/Object1/3.jpg","images/ourWork/Object1/4.jpg");
		$scope.galleries.push(gallery);
		
		console.info($scope.galleries[0].getter());*/	
		
	}
	
	$scope.loadedImage = function(index) {
		$scope.loadedImage[index] = true;
		// Image size correction
		//$scope.galleries[index].imageShow();
	}

})

// Image load directive
.directive('imageonload', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('load', function() {
				scope.$apply(attrs.imageonload);
			});
		}
	};
});